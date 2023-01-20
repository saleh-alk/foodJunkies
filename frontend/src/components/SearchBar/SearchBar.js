import { useHistory } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const history = useHistory();

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            history.push(`/posts?search=${e.target.value}`);
        }
    }

    return (
        <div id='searchbar-wrapper'>
            <input placeholder='Search...' onKeyDown={handleSearch} id='searchbar'></input>
        </div>
    )
}

export default SearchBar;