import { Card, Slider, Button, Typography, Tag, Tooltip, Space, Flex } from 'antd'
import { CaretRightOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useSelector } from '@/store/map-store.ts'
import { useTimelinePlayback } from './useTimelinePlayback.ts'

export const Timeline = () => {
    const timePoints = useSelector(s => s.timePoints)
    const selectedIndex = useSelector(s => s.selectedTimeIndex)

    const { isPlaying, onTogglePlay, goToIndex, onStepPrev, onStepNext } = useTimelinePlayback(selectedIndex, timePoints.length)

    const sliderMarks = timePoints.reduce<Record<number, string>>((acc, time, idx) => {
        acc[idx] = time
        return acc
    }, {})

    const isFirst = selectedIndex <= 0
    const isLast = selectedIndex >= timePoints.length - 1

    return (
        <Card size='small'>
            <Flex vertical gap='small'>
                <Flex align='center' justify='space-between'>
                    <Space size='small'>
                        <ClockCircleOutlined />
                        <Typography.Text strong>Временная шкала наблюдений</Typography.Text>
                    </Space>

                    <Space size='small'>
                        <Tag color='cyan'>Текущее время:</Tag>
                        <Tag color='processing'>{timePoints[selectedIndex]}</Tag>
                    </Space>
                </Flex>

                <Slider
                    min={0}
                    max={timePoints.length - 1}
                    value={selectedIndex}
                    marks={sliderMarks}
                    step={1}
                    tooltip={{ formatter: val => (val !== undefined ? timePoints[val] : '') }}
                    onChange={(val: number) => goToIndex(val)}
                />

                <Flex justify='center' align='center'>
                    <Space size='middle'>
                        <Tooltip title='Предыдущий час'>
                            <Button shape='circle' icon={<StepBackwardOutlined />} disabled={isFirst} onClick={onStepPrev} />
                        </Tooltip>

                        <Tooltip title={isPlaying ? 'Остановить' : 'Автоматическое воспроизведение'}>
                            <Button
                                type='primary'
                                shape='circle'
                                size='large'
                                icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
                                onClick={onTogglePlay}
                            />
                        </Tooltip>

                        <Tooltip title='Следующий час'>
                            <Button shape='circle' icon={<StepForwardOutlined />} disabled={isLast} onClick={onStepNext} />
                        </Tooltip>
                    </Space>
                </Flex>
            </Flex>
        </Card>
    )
}
