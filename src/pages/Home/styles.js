import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #1d2128;
    position: relative;
    overflow-x: hidden;
`;

export const BackgroundLogo = styled.img`
    position: fixed;
    top: 50%;
    left: -120px;
    transform: translateY(-50%);
    height: 90vh;
    opacity: 0.15;
    pointer-events: none;
    user-select: none;

    @media (max-width: 900px) {
        height: 60vh;
        left: -150px;
        opacity: 0.08;
    }
`;

export const Content = styled.main`
    max-width: 780px;
    width: 90%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;

    @media (min-width: 1024px) {
        margin-right: 10%;
        margin-left: auto;
    }
`;

export const SearchBar = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    margin-bottom: 32px;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

export const ProfileCard = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
`;

export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 20px;

    @media (max-width: 580px) {
        flex-direction: column;
        text-align: center;
    }
`;

export const Avatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    object-fit: cover;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProfileName = styled.h2`
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
`;

export const ProfileLogin = styled.span`
    color: #999999;
    font-size: 14px;
    margin-top: 4px;
`;

export const ProfileBio = styled.p`
    color: #999999;
    font-size: 14px;
    margin-top: 12px;
    line-height: 1.5;
`;

export const ProfileDivider = styled.hr`
    background-color: rgba(229, 229, 229, 0.2);
    border: none;
    height: 1px;
    margin-top: 24px;
    margin-bottom: 24px;
`;

export const MessageAlert = styled.div`
    color: ${(props) => (props.$error ? '#f85149' : '#999999')};
    background-color: ${(props) => (props.$error ? 'rgba(248, 81, 73, 0.1)' : 'transparent')};
    border: ${(props) => (props.$error ? '1px solid rgba(248, 81, 73, 0.4)' : 'none')};
    padding: ${(props) => (props.$error ? '12px 16px' : '8px 0')};
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 15px;
    text-align: center;
`;

export const ReposSection = styled.section`
    width: 100%;
    margin-top: 10px;
`;

export const ReposTitle = styled.h3`
    color: #ffffff;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px;
`;

export const FilterWrapper = styled.div`
    width: 100%;
    margin-bottom: 24px;
`;

export const EmptyReposMessage = styled.p`
    color: #999999;
    font-size: 15px;
    text-align: center;
    margin: 32px 0;
`;

