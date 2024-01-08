import StickyHeadTable from './tabla'
import axios from 'axios'

const API_URL = 'https://pym-database.pockethost.io/api/collections';

async function LoadUsers() {
  const result = await axios.get(`${API_URL}/Formulario/records`)
  return (result.data.items)
}

async function TablaPage() {
  const users = await LoadUsers()
  return (
    <section>
      <StickyHeadTable users={users}>
      </StickyHeadTable>
    </section>
  )
}

export default TablaPage
