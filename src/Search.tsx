import type { FC } from 'react';
import { countries, categories } from './data';

interface SearchProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSearchSelect: React.Dispatch<React.SetStateAction<any>>;
    setSearchSelectCategory: React.Dispatch<React.SetStateAction<string>>;
    search: string;
    searchSelectCategory: string;
    searchSelectCountry: any;
    open: string;
    setOpen: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FC<SearchProps> = ({ search, setSearch, setSearchSelect, setSearchSelectCategory, searchSelectCategory, searchSelectCountry, open, setOpen }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected: any = e.target.value;

        if (open === 'Country') {
            const country = countries.find(c => c.code === selected);
            if (country) setSearchSelect(country);
        } else if (open === 'Category') {
            if (categories.includes(selected)) setSearchSelectCategory(selected);
        }
    };

    return (
        <form className="d-flex gap-2">
            {open === "Search" && (
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search topics..."
                    value={search}
                    onChange={handleInputChange}
                />
            )}

            {open === "Country" && (
                <select className="form-select" onChange={handleSelectChange} defaultValue={searchSelectCountry.code}>
                    <option disabled value="">Select a country</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            )}

            {open === "Category" && (
                <select className="form-select" onChange={handleSelectChange} defaultValue={searchSelectCategory}>
                    <option disabled value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            )}

            <select
                className="form-select"
                style={{ width: '150px' }}
                value={open}
                onChange={(e) => setOpen(e.target.value)}
            >
                {["Search", "Category", "Country"].map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default Search;
