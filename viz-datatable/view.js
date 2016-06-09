define([
  "pentaho/visual/base/View",
  "pentaho/data/filter",
  "underscore",
  "datatables.net",
  "datatables.net-bs",
  "datatables.net-fixedheader"
  //"css!node_modules/datatables.net-bs/css/dataTables.bootstrap",
  //"css!node_modules/datatables.net-scroller-bs/css/scroller.bootstrap"
], function(BaseView, filter, _) {
  "use strict";

  var dTable;

  return BaseView.extend({

    /** @override */
    _init: function() {
      this.base();

      $(this._element).append('<table id="content" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">');
    },

    /** @override */
    _render: function() {

      var tData = parse(this.model.getv("data"));

      if(dTable) {
        dTable.destory();
        $('#content').empty();
      }

      dTable = $('#content').DataTable( {

        data:           tData.data,
        columns:        tData.columns,

        //scrollY:        this.model.getv("scrollY"),
        fixedHeader:    this.model.getv("fixedHeader"),
        ordering:       this.model.getv("ordering")
      } );
    },

    /** @override */
    _resize: function() {

      var w  = this.model.getv("width");
      var h = this.model.getv("height");

      $(this._element).css({ width: w, height: h });
    },

    /** @override */
    dispose: function() {
      this.base();
    }
  });

  function parse(data) {

    var tData = { data: [], columns: [] };

    _.each(data.model.attributes, function(attr, a){
      tData.columns.push({title: attr.label});
    });

    _.each(data.implem.rows, function(row, r){
        var rData = [];
        _.each(row.c, function(cData, c){
            rData.push(cData.v);
        });
        tData.data.push(rData);
    });

    return tData;
  }
});
