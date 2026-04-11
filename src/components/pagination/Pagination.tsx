import './Pagination.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        className="nav-button"
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      <span>{currentPage} / {totalPages}</span>

      <button 
        className="nav-button"
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination