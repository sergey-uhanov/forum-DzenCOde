import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

interface SortSelectProps {
	sort: string
	setSort: (value: string) => void
}

const SortSelect: React.FC<SortSelectProps> = ({ sort, setSort }) => {
	return (
		<FormControl sx={{ minWidth: 120, maxWidth: 150 }}>
			<InputLabel id='sort-select-label'>Сортировка</InputLabel>
			<Select
				labelId='sort-select-label'
				id='sort-select'
				value={sort}
				label='Сортировка'
				onChange={e => setSort(e.target.value)}
			>
				<MenuItem value='user_name-asc'>Имя (A-Я)</MenuItem>
				<MenuItem value='user_name-desc'>Имя (Я-A)</MenuItem>
				{/* <MenuItem value='email-asc'>Email (A-Z)</MenuItem>
				<MenuItem value='email-desc'>Email (Z-A)</MenuItem> */}
				<MenuItem value='date-asc'>Дата (сначала старые)</MenuItem>
				<MenuItem value='date-desc'>Дата (сначала новые)</MenuItem>
			</Select>
		</FormControl>
	)
}

export default SortSelect
