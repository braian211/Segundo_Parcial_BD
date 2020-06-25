const { pool } = require('../config/config');

const getTutoriales = async () => {
    const tutoriales = await pool.query('SELECT * FROM TUTORIAL');
    return tutoriales.rows;
};


const getTutorial = async (id) => {
    const query = {
        text: 'SELECT * FROM TUTORIAL WHERE ID = $1',
        values: [id]
      }
    const tutorial = await pool.query(query);
    return tutorial.rows[0];
};

const addTutorial = async (tutorial) => {
    const {titulo,descripcion,publicado} = tutorial
    const query = {
        text: 'INSERT INTO TUTORIAL (titulo, descripcion, publicado ) VALUES ($1, $2, $3 )',
        values: [tutorial.titulo, tutorial.descripcion, tutorial.publicado]
      }
    const addRow = await pool.query(query);
    return addRow.rowCount;
}

const actualizarTutorial = async (id, tutorial) => {
    const query = {
        text: 'UPDATE TUTORIAL SET titulo=$1, descripcion=$2, publicado=$3 WHERE id=$4',
        values: [tutorial.titulo, tutorial.descripcion, tutorial.publicado, id]
      }
    const addRow = await pool.query(query);
    return addRow.rowCount;
};

const removeTutoriales = async () => {
	const query = {
        text: 'DELETE FROM TUTORIAL',
      }
  const removeRow = await pool.query(query);
  return removeRow.rowCount;
};

const removeTutorial = async (id) => {
    const query = {
        text: 'DELETE FROM TUTORIAL WHERE ID = $1',
        values: [id]
      }
    const removeRow = await pool.query(query);
    return removeRow.rowCount;
};
 
module.exports =  { getTutoriales, addTutorial, getTutorial, removeTutorial, removeTutoriales, actualizarTutorial };