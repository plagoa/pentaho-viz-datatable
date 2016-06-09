define([
  "pentaho/visual/base/model"
], function(baseModelFactory) {
  "use strict";

  return function(context) {
    var BaseModel = context.get(baseModelFactory);

    return BaseModel.extend({
      type: {
        id: "viz-datatable",
        view: "view",
        props: [
          {
            name: "scrollY"
          },
          {
            name: "fixedHeader",
            type: "boolean"
          }
          ,
          {
            name: "ordering",
            type: "boolean"
          }
        ]
      }
    });
  };
});
