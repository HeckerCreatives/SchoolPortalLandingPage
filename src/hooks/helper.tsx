export  const formatDate = (date: string) => {
    const formattedDate = date.split('T');
    return formattedDate[0]
}