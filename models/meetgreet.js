'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeetGreet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event }) {
      // define association here
      MeetGreet.belongsTo(Band, {
        foreignKey: "band_id",
        as: "bands" // table name
      })

      MeetGreet.belongsTo(Event, {
        foreignKey: "event_id",
        as: "events" // table name
      })
    }
  }
  MeetGreet.init({
    meet_greet_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    meet_start_time: DataTypes.DATE,
    meet_end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MeetGreet',
    tableName: 'meet_greets',
    timestamps: false
  });
  return MeetGreet;
};