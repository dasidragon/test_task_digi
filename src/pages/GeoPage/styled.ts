import styled from '@emotion/styled'
import { Layout, Flex } from 'antd'

const { Header, Footer } = Layout

export const StyledLayoutRoot = styled(Layout)`
    height: 100vh;
`

export const StyledHeader = styled(Header)`
    background-color: #ffffff;
`

export const StyledContentFlex = styled(Flex)`
    padding: 12px;
    height: 100%;
`

export const StyledMapPane = styled.div`
    flex: 1;
    min-height: 0;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e8e8e8;
    background: #ffffff;
`

export const StyledSidebar = styled(Flex)`
    width: 360px;
    overflow: hidden;
    min-height: 0;
`

export const StyledFooter = styled(Footer)`
    padding: 0 12px 12px;
    background: transparent;
`
