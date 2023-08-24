import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import {useCallback, useState} from 'react';
import {useAppSelector} from '../../hooks';
import OffersEmpty from '../../components/offers-empty/offers-empty';
import cn from 'classnames';
import {TSorting} from '../../types/offer';
import {SortingOffers} from '../../const';
import {sorting} from '../../utils/offers';
import {getCity} from '../../store/app-process/selectors';
import {getOffers} from '../../store/data-process/selectors';
import Locations from '../../components/locations/locations';
import Header from '../../components/header/header';
import Sorting from '../../components/sorting/sorting';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const locations = [...new Set(offers.map((offer) => offer.city.name))];
  console.log(locations)

  const [selectedSorting, setSelectedSorting] = useState<TSorting>(SortingOffers.Popular);

  const offersByActiveCity = offers.filter((offer) => offer.city.name === activeCity);
  const offersBySorting = sorting[selectedSorting](offersByActiveCity);

  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const handleCardMouseEnter = useCallback((idOffer: string) => {
    setSelectedOffer(idOffer);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setSelectedOffer(null);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header isNavigation />

      <main className={cn('page__main page__main--index', {
        'page__main--index-empty': !offersByActiveCity.length
      })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations locations={locations} location={activeCity} />
        </div>
        <div className="cities">
          {offersByActiveCity.length
            ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersByActiveCity.length} places to stay in {activeCity}
                </b>
                <Sorting
                  selectedSorting={selectedSorting}
                  onTypeClick={(sort) => setSelectedSorting(sort)}
                />
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={offersBySorting}
                    onCardMouseEnter={handleCardMouseEnter}
                    onCardMouseLeave={handleCardMouseLeave}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={offersByActiveCity[0]?.city}
                    offers={offersByActiveCity}
                    selectedOffer={selectedOffer}
                  />
                </section>
              </div>
            </div>
            : <OffersEmpty city={activeCity} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
