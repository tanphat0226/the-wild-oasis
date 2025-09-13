import { SUPABASE_URL } from '../utils/constants'
import supabase from './supabase'

export const signup = async ({ email, password, fullName }) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { fullName, avatar: '' } },
	})

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export const login = async ({ email, password }) => {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export const getCurrentUser = async () => {
	const { data: session } = await supabase.auth.getSession()

	if (!session.session) return null

	const { data, error } = await supabase.auth.getUser()

	if (error) {
		throw new Error(error.message)
	}

	return data?.user
}

export const logout = async () => {
	const { error } = await supabase.auth.signOut()

	if (error) throw new Error(error.message)
}

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
	let updateData
	if (password) updateData = { password }
	if (fullName) updateData = { data: { fullName } }

	// 1. Update password OR full name
	const { data, error } = await supabase.auth.updateUser(updateData)

	if (error) throw new Error(error.message)

	if (!avatar) return data
	// 2. Upload avatar image
	const fileName = `avatar-${data.user.id}-${Math.random()}`

	const { error: uploadError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar, {
			cacheControl: '3600',
			upsert: true,
		})

	if (uploadError) throw new Error(uploadError.message)
	// 3. Update avatar in user
	const { data: updatedData, error: updateError } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
			},
		})

	if (updateError) throw new Error(updateError.message)

	return updatedData
}
