const db = require('../../data/db-config')

function find() {
  return db('schemes as sc')
  .count('st.step_id as number_of_steps')
  .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
  .select('sc.*')
  .groupBy('sc.scheme_id')
  .orderBy('sc.scheme_id')
}

async function findById(scheme_id) { // EXERCISE B
  
  const id = await db('schemes').select('scheme_id').where({'scheme_id': scheme_id}).first()

  const scheme = await db('schemes as sc')
  .leftJoin(
    'steps as st', 
    'sc.scheme_id', 
    'st.scheme_id'
    )
  .select(
    'sc.scheme_name', 
    'sc.scheme_id', 
    'st.step_number', 
    'st.step_id', 
    'st.instructions'
  )
  .where('sc.scheme_id', id.scheme_id)
  .orderBy('st.step_number')

  const response = scheme.reduce((acc, step) => {
    const {step_number, step_id, instructions} = step
    if (acc[step.scheme_name]) {
      acc[step.scheme_name].steps.push({step_number, step_id, instructions})
    } else {
      if(step.step_id === null) {
        acc[step.scheme_name] = {scheme_id: step.scheme_id, steps: []}
      } else {
      acc[step.scheme_name] = {scheme_id: step.scheme_id, steps: [{step_number, step_id, instructions}]}
      }
    }
    return acc
  }, {})

  return response
}

async function findSteps(scheme_id) { // EXERCISE C
  const id = await db('schemes').select('scheme_id').where({'scheme_id': scheme_id}).first()

  const steps = await db('schemes as sc')
  .leftJoin(
    'steps as st', 
    'sc.scheme_id', 
    'st.scheme_id'
    )
  .select(
    'sc.scheme_name',  
    'st.step_number', 
    'st.step_id', 
    'st.instructions'
  )
  .where('sc.scheme_id', id.scheme_id)
  .orderBy('st.step_number')

  return steps 
}

function add(scheme) { // EXERCISE D
  return db('schemes')
  .insert(scheme)
  .then(id => {
    return findById(id[0])
  })
}

function addStep(scheme_id, step) { // EXERCISE E
  return db('steps')
  .insert({step_number: step.step_number, instructions: step.instructions, scheme_id: scheme_id})
  .then(() => {
    return db('schemes as sc')
    .leftJoin(
      'steps as st', 
      'sc.scheme_id', 
      'st.scheme_id'
      )
    .select(
      'sc.scheme_name',  
      'st.step_number', 
      'st.step_id', 
      'st.instructions'
    )
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')
  })
  
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
