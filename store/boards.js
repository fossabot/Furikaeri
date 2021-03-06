export const state = () => ({
  columns: [
    {
      name: 'aiueo',
      notes: [
        {
          title: '1',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '2',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '3',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '4',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '5',
          content: 'Lorem ipsum dolor sit amet'
        }
      ]
    },
    {
      name: 'aiueo333',
      notes: [
        {
          title: '1',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '2',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '3',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '4',
          content: 'Lorem ipsum dolor sit amet'
        },
        {
          title: '5',
          content: 'Lorem ipsum dolor sit amet'
        }
      ]
    }
  ]
})

export const mutations = {
  addColumn (state, payload) {
    state.columns.push({
      name: payload.name,
      notes: []
    })
  },
  addNote (state, { title, content, index }) {
    state.columns[index].notes.push({
      title,
      content
    })
  },
  setColumn (state, { index, column }) {
    state.columns[index] = column
  },
  setNote (state, { index, note }) {
    state.columns[index].notes = note
  },
  setNoteTitle  (state, { columnIndex, noteIndex, title }) {
    state.columns[columnIndex].notes[noteIndex].title = title
  },
  setNoteContent  (state, { columnIndex, noteIndex, content }) {
    state.columns[columnIndex].notes[noteIndex].content = content
  },
  removeColumn (state, { index }) {
    state.columns.splice(index, 1)
  }
}

export const getters = {
  columns: (state) => {
    return state.columns
  },
  getColumnIndex: (state) => (columnName) => {
    return state.columns.findIndex(({name}) => name === columnName)
  },
  getNotes: (state) => (index) => {
    return state.columns[index].notes
  },
  existsColumn: (state) => (columnName) => {
    return state.columns.some(col => col.name === columnName)
  }
}
