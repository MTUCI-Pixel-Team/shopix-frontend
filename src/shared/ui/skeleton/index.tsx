import ContentLoader from 'react-content-loader'

export const ReviewsUserSkeleton = () => (
    <ContentLoader
        speed={2}
        width={226}
        height={50}
        viewBox="0 0 226 50"
        backgroundColor="var(--second-primary)"
        foregroundColor="#f7f7f7"
    >
        <rect x="-8" y="334" rx="0" ry="0" width="355" height="20" />
        <rect x="-10" y="366" rx="0" ry="0" width="351" height="20" />
        <rect x="3" y="415" rx="0" ry="0" width="50" height="20" />
        <rect x="305" y="407" rx="0" ry="0" width="32" height="34" />
        <rect x="4" y="209" rx="16" ry="16" width="359" height="49" />
        <circle cx="27" cy="25" r="25" />
        <rect x="59" y="2" rx="8" ry="8" width="159" height="20" />
        <rect x="202" y="9" rx="0" ry="0" width="0" height="2" />
        <rect x="59" y="30" rx="8" ry="8" width="159" height="19" />
    </ContentLoader>
)

export const ProductCardSkeleton = () => (
    <ContentLoader
        speed={2}
        width={365}
        height={365}
        viewBox="0 0 365 365"
        backgroundColor="var(--second-primary)"
        foregroundColor="#ffffff"
    >
        <rect x="0" y="-1" rx="16" ry="16" width="326" height="213" />
        <rect x="0" y="236" rx="8" ry="8" width="232" height="19" />
        <rect x="1" y="273" rx="8" ry="8" width="232" height="19" />
        <rect x="1" y="345" rx="8" ry="8" width="232" height="19" />
        <circle cx="300" cy="300" r="25" />
        <rect x="0" y="309" rx="8" ry="8" width="232" height="19" />
    </ContentLoader>
)

export const ReviewsCardSkeleton = () => (
    <ContentLoader
        speed={2}
        width={226}
        height={50}
        viewBox="0 0 226 50"
        backgroundColor="var(--second-primary)"
        foregroundColor="#ffffff"
    >
        <circle cx="25" cy="25" r="25" />
        <rect x="64" y="6" rx="8" ry="8" width="161" height="13" />
        <rect x="65" y="28" rx="8" ry="8" width="161" height="13" />
    </ContentLoader>
)
