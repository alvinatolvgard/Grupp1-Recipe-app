import { useParams } from 'react-router-dom'

function RecipeDetailPage() {
    const { id } = useParams()

    console.log('Recept-ID från URL:', id)
    
    return (
        <div>
            <h1>Recipe Detail Page</h1>
        </div>
    )
}

export default RecipeDetailPage