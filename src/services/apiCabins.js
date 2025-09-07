import { SUPABASE_URL } from '../utils/constant'
import supabase from './supabase'

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		console.error(error)
		throw new Error('Cabins could not be loaded')
	}

	return data
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(SUPABASE_URL)

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	)
	const imagePath = hasImagePath
		? newCabin.image
		: `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`

	// 1. Create/Edit cabin
	let query = supabase.from('cabins')

	// B. EDIT
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

	// A. CREATE
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

	const { data, error } = await query.select().single()

	if (error) {
		console.error(error)
		throw new Error('Cabins could not be created')
	}

	// 2. Upload image
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image)

	// 3. Delete the cabin If there was an error uploading the image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id)
		console.error(storageError)
		throw new Error(
			'Cabin image could not be uploaded and cabin was not created'
		)
	}

	return data
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error)
		throw new Error('Cabins could not be deleted')
	}

	return data
}
