require('../../../gulp/gulp-init.js')({HTML: '.'});

const comb = require('../../../gulp/tasks/comb.js'),
  scssDC = require('../../../gulp/tasks/scss.js').scssDC,
  {sync, syncInit} = require('../../../gulp/tasks/sync.js');

function watchFiles() {
  syncInit();
  watch($.PATH.scss.files, series(scssDC));
  watch([$.PATH.js.files, `!${$.PATH.js.filesMin}`], series(sync));
  watch($.PATH.html.files, sync);
}

task('combScss', comb);
task('sass', series(scssDC));
task('watch', watchFiles);
