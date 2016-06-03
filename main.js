define(
  [
    "pentaho/type/Context",
    "pentaho/data/Table",
    "viz-datatable/model",
    "pentaho/type/configurationService",
    "underscore"
  ], function(Context, Table, myModelFactory, configurationService) {
    "use strict";

    var context = new Context();

    var output = document.getElementById("output");

    var MyModel = context.get(myModelFactory);

    var model = new MyModel(
      {
        width: 800,
        height: 600,

        data: new Table(mockData(1000, 5)),

        scrollY: 500,
        fixedHeader: true
      }
    );

    model.type.viewClass.then(function(MyView) {
      var view = new MyView(output, model);

      view.render();
    });

    function mockData(rowsNum, colsNum) {

      var dataset = {};

      dataset.model = [];
      for ( var c=0 ; c<colsNum ; c++ ) {
        dataset.model.push({name: "col_" + c, type: "number", label: "Col " + c});
      }

      dataset.rows = [];
      for ( var r=0 ; r<rowsNum ; r++ ) {
        var label = "Label " + randVal(10, rowsNum);
        dataset.rows.push({c: [{v: label, f: label}, randVal(10, rowsNum) ]});
      }

      return dataset;
    }

    function randVal(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  });
