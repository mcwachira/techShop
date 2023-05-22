import React, {  useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { useDispatch, useSelector } from 'react-redux'

// import { DELETE_USER_RESET } from '../../constants/userConstants'
import { toast } from 'react-toastify'
import MetaData from '../Layout/metaData'
import SideBar from './SideBar'
import Loader from '../Layout/Loader'
import { allUsers, clearErrors } from '../../redux/reducers/user/userActions'

const UsersList = () => {

    const dispatch = useDispatch();
    const navigate= useNavigate()

    const { isLoading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('User deleted successfully');
           navigate('/admin/users');
            // dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, navigate, error, isDeleted])

    // const deleteUserHandler = (id) => {
    //     dispatch(deleteUser(id))
    // }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: <>
                    <Link to={`/admin/user/update/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2">
                    {/* onClick={() => deleteUserHandler(user._id)} */}
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })

        })

        return data;
    }
    


    return (
        <>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Users</h1>

                        {isLoading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </>
                </div>
            </div>

        </>
    )
}

export default UsersList