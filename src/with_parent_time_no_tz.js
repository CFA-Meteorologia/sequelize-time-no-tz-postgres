'use strict';

const inherits = require('./utils').inherits;
const getDataTypes = require('./utils').getDataTypes;
const getSequelize = require('./utils').getSequelize;
const moment = require('moment');

function withParentTimeNoTz(DataTypesOrSequelize) {
  const DataTypes = getDataTypes(DataTypesOrSequelize);
  const Sequelize = getSequelize(DataTypesOrSequelize);

  function TIME_NO_TZ(options) {
    if (!(this instanceof TIME_NO_TZ)) return new TIME_NO_TZ(options);
  }
  inherits(TIME_NO_TZ, DataTypes.ABSTRACT);

  TIME_NO_TZ.key = 'TIME_NO_TZ';
  TIME_NO_TZ.prototype.toSql = function () {
    return 'TIMESTAMP';
  };

  TIME_NO_TZ.prototype.stringify = function (value, options) {
    const date = moment(value)
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
  }

  DataTypes.TIME_NO_TZ = TIME_NO_TZ;

  if (Sequelize) {
    Sequelize.DataTypes = DataTypes;
    Sequelize.TIME_NO_TZ = TIME_NO_TZ;

    return Sequelize;
  }

  return DataTypes;
}

module.exports = withParentTimeNoTz;
