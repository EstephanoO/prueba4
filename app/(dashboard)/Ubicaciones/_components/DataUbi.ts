import { API_URL } from "@/app/(dashboard)/Formularios/_components/dataTable"
import axios from "axios"

export const UbiData = async () => {
  const result = await axios.get(`${API_URL}/api/collections/Ubicacion/records`)
  return result.data.items
}
