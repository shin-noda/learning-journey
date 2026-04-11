export const getPaginatedItems = <T>(items: T[], page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize
  const paginatedItems = items.slice(offset, offset + pageSize)
  const totalPages = Math.ceil(items.length / pageSize)

  return {
    paginatedItems,
    totalPages,
  }
}