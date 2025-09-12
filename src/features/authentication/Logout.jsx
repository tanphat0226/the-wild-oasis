import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'

const Logout = () => {
	const { logout, isLoggingOut } = useLogout()

	return (
		<ButtonIcon onClick={logout} disabled={isLoggingOut}>
			{!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	)
}

export default Logout
