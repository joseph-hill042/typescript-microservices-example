const { FuseBox } = require('fuse-box')

const fuse = FuseBox.init({
  target: 'server@esnext',
  homeDir: 'src',
  output: 'dist/$name.js',
  sourceMaps: true,
})

fuse.dev({ httpServer: false })

fuse
  .bundle('app')
  .watch()
  .instructions(' > [index.ts]')
  .completed(proc => proc.start())
fuse.run()
