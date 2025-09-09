export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const FILTER_CABINS = {
	ALL: 'all',
	NO_DISCOUNT: 'no-discount',
	WITH_DISCOUNT: 'with-discount',
}

export const CABINS_SORT_OPTIONS = {
	NAME_ASC: 'name-asc',
	NAME_DESC: 'name-desc',
	PRICE_ASC: 'regularPrice-asc',
	PRICE_DESC: 'regularPrice-desc',
	CAPACITY_ASC: 'maxCapacity-asc',
	CAPACITY_DESC: 'maxCapacity-desc',
	DATE_ADDED_ASC: 'startDate-asc',
	DATE_ADDED_DESC: 'startDate-desc',
}

export const BOOKINGS_STATUS = {
	ALL: 'all',
	CHECKED_IN: 'checked-in',
	CHECKED_OUT: 'checked-out',
	UNCONFIRMED: 'unconfirmed',
}

export const BOOKINGS_SORT_OPTIONS = {
	START_DATE_DESC: 'startDate-desc',
	START_DATE_ASC: 'startDate-asc',
	TOTAL_PRICE_DESC: 'totalPrice-desc',
	TOTAL_PRICE_ASC: 'totalPrice-asc',
}
