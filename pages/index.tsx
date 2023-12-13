import { Box } from '@chakra-ui/layout'
import { FC } from 'react'
import PlantBoard from '../components/BlossomBuddy/BlossomBuddy'
const IndexPage: FC = () => {
    // Tick the time every second

    return (
        <Box my={10}>
            <PlantBoard />
        </Box>
    )
}

export default IndexPage
