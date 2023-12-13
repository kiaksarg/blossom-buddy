import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stack,
    RadioGroup,
    Radio,
    Text,
    Button,
    IconButton,
    Spacer,
    Box,
    Badge,
    Center,
} from '@chakra-ui/react'
import { LegacyRef, MutableRefObject, useRef, useState } from 'react'
import { FaDivide, FaMinus, FaPlus, FaRedo, FaTimes } from 'react-icons/fa'
import Card from '../Card'
import { FaRunning } from 'react-icons/fa'
import { GiMeditation } from 'react-icons/gi'
import { FaInstagramSquare } from 'react-icons/fa'
import { CgMore } from 'react-icons/cg'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GiElectricalResistance } from 'react-icons/gi'
import { MdDone } from 'react-icons/md'

const TaskList = [
    { text: 'Resist a distraction', icon: <GiElectricalResistance />, score: 1 },
    { text: 'Running for 30 min', icon: <FaRunning />, score: 10 },
    { text: 'Meditating for 10 min', icon: <GiMeditation />, score: 6 },
    { text: 'Not surfing social media more than 20 min', icon: <FaInstagramSquare />, score: 3 },
    { text: 'Any other habit', icon: <CgMore />, score: 2 },
]

const BlossomBuddy = () => {
    const [defaultOp, setDefaultOp] = useState('*')
    const [selectedTask, setSelectedTask] = useState('0')

    const [score, setScore] = useState(72)

    const tasksContainerRef = useRef<HTMLDivElement>()

    // const [scrollLeftVal, setScrollLeftVal] = useState(tasksContainerRef?.current?.scrollLeft ?? 0)

    const handleScrollUp = () => {
        if (Number(selectedTask) < 3) tasksContainerRef.current.scrollTop -= 20
        setSelectedTask((selected) => (selected === '0' ? '0' : String(Number(selected) - 1)))
    }

    const handleScrollDown = () => {
        if (Number(selectedTask) > 1) tasksContainerRef.current.scrollTop += 20
        setSelectedTask((selected) =>
            selected === String(TaskList.length - 1)
                ? String(TaskList.length - 1)
                : String(Number(selected) + 1)
        )
    }

    const handleScoreButton = (isRedo = false) => {
        const task = TaskList[selectedTask]

        if (!isRedo) setScore((scoreState) => scoreState + task.score)
        else setScore((scoreState) => scoreState - task.score)
    }

    return (
        <>
            <Card>
                <Tabs isFitted variant="enclosed">
                    <TabList mb="1em">
                        <Tab>Task</Tab>
                        <Tab>Timer</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Stack>
                                <Center>
                                    <Box pb="6">
                                        <Badge ml="1" colorScheme="green" fontSize="1.8em">
                                            {score} :)
                                        </Badge>
                                    </Box>
                                </Center>
                                <Stack isInline spacing="6">
                                    <Stack spacing="4">
                                        <Spacer />
                                        <IconButton
                                            size="sm"
                                            aria-label="Search database"
                                            icon={<IoIosArrowUp />}
                                            fontSize="20px"
                                            onClick={handleScrollUp}
                                        />
                                        <IconButton
                                            size="sm"
                                            aria-label="Search database"
                                            icon={<IoIosArrowDown />}
                                            fontSize="20px"
                                            onClick={handleScrollDown}
                                        />
                                        <Spacer />
                                    </Stack>
                                    <Stack>
                                        <Box
                                            p="1"
                                            ref={tasksContainerRef}
                                            maxH="150px"
                                            overflow="auto"
                                            css={{
                                                '&::-webkit-scrollbar': {
                                                    height: '8px',
                                                    width: '8px',
                                                },
                                                '&::-webkit-scrollbar-track': {
                                                    height: '6px',
                                                    width: '5px',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    background: '#d1d1d1',
                                                    // borderRadius: '24px',
                                                },
                                            }}
                                        >
                                            <RadioGroup
                                                onChange={(selected) => {
                                                    setSelectedTask(selected)
                                                }}
                                                defaultValue={selectedTask}
                                                value={selectedTask}
                                            >
                                                <Stack spacing={3} direction="column">
                                                    {TaskList.map((x, idx) => (
                                                        <Radio
                                                            value={idx + ''}
                                                            // checked={selectedTask === idx}
                                                            key={idx}
                                                        >
                                                            <Stack
                                                                isInline
                                                                alignContent="center"
                                                                alignItems="center"
                                                            >
                                                                <Text> {x.text}</Text>
                                                                {x.icon}
                                                                <Badge
                                                                    ml="1"
                                                                    colorScheme="purple"
                                                                    // fontSize="1.8em"
                                                                >
                                                                    {TaskList[idx].score}
                                                                </Badge>
                                                            </Stack>
                                                        </Radio>
                                                    ))}
                                                </Stack>
                                            </RadioGroup>
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack isInline px="20">
                                    <IconButton
                                        isRound={true}
                                        variant="solid"
                                        colorScheme="teal"
                                        aria-label="Done"
                                        fontSize="20px"
                                        icon={<FaRedo />}
                                        onClick={() => handleScoreButton(true)}
                                    />
                                    <Spacer />
                                    <IconButton
                                        isRound={true}
                                        variant="solid"
                                        colorScheme="green"
                                        aria-label="Done"
                                        fontSize="20px"
                                        icon={<MdDone />}
                                        onClick={() => handleScoreButton(false)}
                                    />
                                </Stack>
                            </Stack>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Card>
        </>
    )
}

export default BlossomBuddy
