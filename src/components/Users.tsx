import Box from '@mui/material/Box'
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid'
import { Container, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../services/api'
import { IUser } from '../types/types'
import { grey } from '@mui/material/colors'
import UsersActions from './UserActions'

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([])
  const [rowId, setRowId] = useState<number | null>(null)

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetchUsers()
        setUsers(response)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'User ID', width: 90 },
      {
        field: 'name',
        headerName: 'Name',
        width: 160,
        editable: true,
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 150,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
        sortable: false,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        width: 180,
        sortable: false,
        editable: true,
      },
      {
        field: 'website',
        headerName: 'Website',
        sortable: false,
        width: 110,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: params => <UsersActions {...{ params, rowId, setRowId }} />,
      },
    ],
    [rowId]
  )

  return (
    <Container>
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography
          variant='h1'
          component='h1'
          sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
          Manage Users
        </Typography>
        <DataGrid
          rows={users}
          columns={columns}
          loading={!users.length}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[3, 5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowSpacing={params => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[200],
            },
          }}
          editMode='row'
          // onCellEditCommit={params => setRowId(params.id)}
        />
      </Box>
    </Container>
  )
}
