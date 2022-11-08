import { useState } from 'react'
import { LEADERS } from '.././shared/leaders'

function Midterm() {
  const [leaders, setLeaders] = useState(LEADERS)
  const [isUpdate, setIsUpdate] = useState(false)
  const [infoUpdate, setInfoUpdate] = useState({})
  const [indexAction, setIndexAction] = useState()
  const [leader, setLeader] = useState({
    name: '',
    price: '',
  })

  const handleChange = (e, setValue) => {
    const { name, value } = e.target
    setValue(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLeaders(prevState => [...prevState, leader])
    setLeader({ name: '', description: '' })
  }

  const handleDelete = index => {
    setLeaders(prevState => prevState.filter((_, i) => i !== index))
  }

  const handleEdit = e => {
    e.preventDefault()
    const newLeaders = leaders.map((item, i) => {
      if (indexAction === i) {
        item = {
          ...item,
          name: infoUpdate.name,
          description: infoUpdate.description,
        }
        console.log(item)

        setIsUpdate(false)
        setInfoUpdate({})
      }
      return item
    })
    setLeaders(newLeaders)
  }

  return (
    <div
      style={{
        marginTop: '10px',
      }}
    >
      <form
        action="
            "
        onSubmit={handleSubmit}
        className="d-flex "
      >
        <label for="name">Leader:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          required
          value={leader.name}
          onChange={e => handleChange(e, setLeader)}
        />
        <label for="description">description:</label>
        <br />
        <input
          type="text"
          name="description"
          id="description"
          required
          value={leader.description}
          onChange={e => handleChange(e, setLeader)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
          {leaders.map((leader, index) => {
            return (
              <li key={index}>
                <p>Name: {leader.name}</p>
                <p>Description: {leader.description}</p>
                <button onClick={() => handleDelete(index)}>X </button>
                <button
                  onClick={() => {
                    setIndexAction(index)
                    setIsUpdate(true)
                  }}
                >
                  Update
                </button>
              </li>
            )
          })}
        </ul>
        {isUpdate && (
          <form action="">
            <input
              value={infoUpdate.name}
              type="text"
              placeholder="leader"
              name="name"
              onChange={e => handleChange(e, setInfoUpdate)}
            />
            <input
              value={infoUpdate.description}
              type="text"
              placeholder="description"
              name="description"
              onChange={e => handleChange(e, setInfoUpdate)}
            />
            <button onClick={e => handleEdit(e)}>Edit</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Midterm
