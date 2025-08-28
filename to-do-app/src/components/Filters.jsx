import './Filters.css'

export default function Filters({filter, setFilter}) {
    
    return (
        <div className="filters-container">
            <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
            >
                All
            </button>
            <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
            >
                Pending
            </button>
            <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
            >
                Completed
            </button>
        </div>
    )
}
