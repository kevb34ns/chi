let strAniController = [
  '$scope',
  'MongoService',
  function($scope, MongoService) {
    let ctrl = this;

    ctrl.directoryName = "No directory chosen.";

    ctrl.updateDatabase = function() {
      let electron = require('electron').remote;
      let {dialog} = electron;
      let fs = require('fs');


      dialog.showOpenDialog(
        electron.getCurrentWindow(),
        {
          title: 'Select Animation Directory',
          properties: ['openDirectory']
        }, (folderPaths) => {
          if (folderPaths !== undefined) {
            // TODO bug: this doesn't update until you open another dialog
            ctrl.directoryName = folderPaths[0];
            fs.readdir(folderPaths[0], (err, files) => {
              let db = MongoService.strokeAnimDb();
              files.forEach((val) => {
                val = folderPaths[0] + '\\' + val;

                // check if val is .svg
                if (!val.endsWith('.svg')) {
                  return;
                }

                // get charCode key
                let match = val.match(/^.+\\(\d+)\.svg$/);
                if (!match) {
                  return;
                }

                let charCodeStr = match[1];

                if (fs.lstatSync(val).isFile()) {
                  let data = fs.readFileSync(val, 'utf-8');
                  if (data) {
                    // add new mongo entry with charCode and data
                    let newEntry = {
                      charCode: charCodeStr,
                      svg: data
                    };

                    db.update(
                      {charCode: charCodeStr}, newEntry, { upsert: true },
                      (err) => {
                        if (err) {
                          throw err;
                        }
                      }
                    );
                  }
                }
              })
            });
          }
        });

    }
  }
];


angular.module('app')
.component('strAniPage', {
  templateUrl: './str-ani-page/str-ani-page.template.html',
  controller: strAniController
});
