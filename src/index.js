'use strict'

const debug = require('debug')('webpack-get-code-on-done')
const path = require('path')
const requireFromString = require('require-from-string')
const Compiler = require('webpack/lib/Compiler')
const sourceMapSupport = require('source-map-support')

const DEFAULTS = {
	chunkName: 'main'
}

function interopRequireDefault (obj) {
	return obj && obj.__esModule ? obj.default : obj
}

function getFilename (stats, outputPath, chunkName) {
	const assetsByChunkName = stats.toJson().assetsByChunkName
	let filename = assetsByChunkName[chunkName] || ''
	// If source maps are generated `assetsByChunkName.main`
	// will be an array of filenames.
	return path.join(
		outputPath,
		Array.isArray(filename)
			? filename.find(asset => /\.js$/.test(asset))
			: filename
	)
}

function getCompiled (filename, buffer) {
	return interopRequireDefault(requireFromString(buffer.toString(), filename))
}

function installSourceMapSupport (fs) {
	sourceMapSupport.install({
		// NOTE: If https://github.com/evanw/node-source-map-support/pull/149
		// lands we can be less aggressive and explicitly invalidate the source
		// map cache when Webpack recompiles.
		emptyCacheBetweenOperations: true,
		retrieveFile (source) {
			try {
				return fs.readFileSync(source, 'utf8')
			} catch (ex) {
				// Doesn't exist
			}
		}
	})
}

/**
 * Returns compiled code after compilation (compiler "done")
 * @param   {Compiler} compiler - e.g webpack([clientConfig, serverConfig])
 * @param   {Function} done - callback to be executed with compiled server code
 */
function webpackGetCodeOnDone (compiler, done) {
	debug('Using webpack-get-code-on-done')

	const options = Object.assign({}, DEFAULTS)

	if (!(compiler instanceof Compiler)) {
		throw new Error(`Expected compiler to be an instance of 'Compiler'`)
	}

	const outputFs = compiler.outputFileSystem
	const outputPath = compiler.outputPath

	installSourceMapSupport(outputFs)

	let compiledCode
	let error = false

	compiler.plugin('done', stats => {
		error = false
		// Server compilation errors need to be propagated to the client.
		if (stats.compilation.errors.length) {
			error = stats.compilation.errors[0]
			return
		}
		const filename = getFilename(stats, outputPath, options.chunkName)
		const buffer = outputFs.readFileSync(filename)

		try {
			compiledCode = getCompiled(filename, buffer)
		} catch (ex) {
			debug(ex)
			error = ex
		}

		if (compiledCode) {
			done(compiledCode)
		} else {
			throw new Error('webpack-get-code-on-done: Compiled code is `undefined`. Please check latest changes that may produce this error.')
		}
	})
}

module.exports = webpackGetCodeOnDone
