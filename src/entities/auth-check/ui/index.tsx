import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
// import { getToken } from '@/shared/config/local-storage'
import { paths } from '@/shared/config/router'
import { getToken } from '@/shared/config/storage'

export const AuthCheck = ({ children }: { children: ReactNode }) => {
    if (getToken()) {
        return children
    } else {
        return <Navigate to={paths.auth} />
    }
}
