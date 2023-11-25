import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { FC, ReactEventHandler } from 'react';
import fallback from 'src/assets/fallback.jpg';
import { IServerSideData } from 'src/types/types';
import { cardState } from 'src/utils/cardState';

import styles from './Details.module.scss';

interface ICardDetailsProps {
  data: IServerSideData;
}

const CardDetails: FC<ICardDetailsProps> = (data) => {
  const router = useRouter();

  // const { id } = useAppSelector((state) => state.idReducer);
  // const dispatch = useAppDispatch();
  // const { setId } = idSlice.actions;
  const searchParams = useSearchParams();
  const id = searchParams?.get('details') as string;

  // const id = router.pathname;
  // const { data, isLoading, error } = cardsAPI.useFetchCardByIdQuery(id);
  const { isError } = data.data;

  if (!data) {
    return;
  }

  const card = data?.data.data.data[0] || cardState;

  const addDefaultSrc: ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    if (target) {
      target.src = fallback.src;
    }
  };

  const defineType = (type: string) => {
    switch (true) {
      case type.includes('Monster'):
        return styles.typeMonster;
      case type === 'Spell Card':
        return styles.typeSpell;
      case type === 'Trap Card':
        return styles.typeTrap;
      default:
        return styles.typeOther;
    }
  };

  const handleClose = () => {
    router.query.details = '';
    router.push(
      {
        pathname: '/',
        query: { ...router.query },
      },
      undefined,
      {}
    );
  };

  if (isError) {
    return;
  }

  // if (isLoading) {
  //   return (
  //     <SkeletonTheme baseColor="#2b2b2b" highlightColor="#707070">
  //       <Skeleton className={styles.skeletonCard} />
  //       {Array(5)
  //         .fill(true)
  //         .map((_, i) => (
  //           <Skeleton key={i} className={styles.skeletonText} />
  //         ))}
  //     </SkeletonTheme>
  //   );
  // }

  return (
    <>
      <div onClick={handleClose} className={styles.overlay} />
      {/* <Link href="/" className={styles.overlay} /> */}
      <div className={`${styles.fixed} ${defineType(card.type)}`}>
        <div className={styles.info}>
          <Image
            width={260}
            height={330}
            onError={addDefaultSrc}
            className={styles.image}
            src={card.card_images[0].image_url}
            alt="A card"
          />
          <p className={styles.description}>{card.desc}</p>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
