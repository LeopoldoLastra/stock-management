const {Model, DataTypes, sequelize}=require('sequelize');

const DEPENDENCIAS_TABLE= 'dependencias';

const DependenciasSchema={
    idDependencia:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_dependencia'
    },
    nombreDependencia:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'nombre_dependencia'
    },
    direccionDependencia:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'direccion_dependencia'
    }
};

class Dependencia extends Model {
    static associate(models){
        this.hasOne(models.Stock,
            {as:'stockDependencia',
            foreignKey: 'idDependencia'
            }
        );
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: DEPENDENCIAS_TABLE,
            modelName: 'Dependencia',
            timestamps:true
        }
}
};

module.exports={DEPENDENCIAS_TABLE, DependenciasSchema, Dependencia}