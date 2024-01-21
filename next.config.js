/** @type {import('next').NextConfig} */

const repo = 'programmer-calc'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

const nextConfig = {
    assetPrefix: assetPrefix,
    basePath: basePath,
    output: "export",
}

module.exports = nextConfig
