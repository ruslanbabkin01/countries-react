import Box from '@mui/material/Box'
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { IUsers } from '../types/types'

export default function Users() {
  const [users, setUsers] = useState<IUsers[]>([])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 90 },
    {
      field: 'name',
      headerName: 'name',
      width: 150,
      editable: true,
    },
    {
      field: 'username',
      headerName: 'User name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 110,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 110,
      sortable: false,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ]

  const rows: GridRowsProp = users.map(user => {})

  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setUsers(json))
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Container>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={!users.length}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSizeOptions={[3, 5, 10]}
          checkboxSelection //вибір row
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  )
}
