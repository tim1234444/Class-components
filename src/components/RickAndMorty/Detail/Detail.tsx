import { Spinner } from '../Spinner/Spinner';
import type { FetchPersonData } from '../../../type/type';
import { useTextError } from '../../../hooks/useTextError';
type Props = {
  isPersonFetching: boolean;
  personInfo?: FetchPersonData;
  isDetailVisible: boolean;
  closeDetail: () => void;
  personError: unknown;
};
export function Detail({
  isPersonFetching,
  personInfo,
  isDetailVisible,
  closeDetail,
  personError,
}: Props) {
  const errorText = useTextError(personError);
  if (!isDetailVisible) return null;

  return (
    <>
      {personError && !isPersonFetching && (
        <div className="character-card">
          <h1>{errorText}</h1>
        </div>
      )}
      {isPersonFetching && (
        <div className="character-card">
          {' '}
          <Spinner></Spinner>
        </div>
      )}
      {personInfo && !isPersonFetching && !personError && (
        <div className="character-card">
          <button onClick={closeDetail} className="close-btn">
            <svg
              width={30}
              height={30}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="4"
                y1="4"
                x2="12"
                y2="12"
                stroke={'black'}
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="4"
                x2="4"
                y2="12"
                stroke={'black'}
                strokeWidth="2"
              />
            </svg>
          </button>
          <img
            src={personInfo.image}
            alt={personInfo.name}
            className="character-image"
          />

          <div className="character-details">
            <h2>{personInfo.name}</h2>
            <ul>
              <li>
                <strong>Status:</strong> {personInfo.status}
              </li>
              <li>
                <strong>Species:</strong> {personInfo.species}
              </li>
              {personInfo.type && (
                <li>
                  <strong>Type:</strong> {personInfo.type}
                </li>
              )}
              <li>
                <strong>Gender:</strong> {personInfo.gender}
              </li>
              <li>
                <strong>Origin:</strong> {personInfo.origin.name}
              </li>
              <li>
                <strong>Current Location:</strong> {personInfo.location.name}
              </li>
              <li>
                <strong>Episodes:</strong> {personInfo.episode.length}
              </li>
              <li>
                <strong>Created:</strong>{' '}
                {new Date(personInfo.created).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
