import React from 'react';
import { useNavigate } from 'react-router-dom';
import './reservationPage.css';

function ReservationPage({ printerStates, setPrinterStates }) {
  const navigate = useNavigate();

  const handleReserve = (index) => {
    const newStates = [...printerStates];
    if (newStates[index] === 'in_use') {
      newStates[index] = 'reserved';   // 예약하기 → reserved
    } else if (newStates[index] === 'reserved') {
      newStates[index] = 'in_use';     // 예약 취소 → 다시 in_use
    }
    setPrinterStates(newStates);
  };

  const getImage = (state) => {
    if (state === 'available') return '/Available.png';
    if (state === 'reserved') return '/bookable.png';
    return '/In_Use.png';
  };

  const getButtonText = (state) => {
    if (state === 'available') return '사용 불가';
    if (state === 'reserved') return '예약 취소';
    return '예약하기';
  };

  const getButtonClass = (state) => {
    if (state === 'available') return 'unavailable';
    if (state === 'reserved') return 'reserved';
    return 'available';
  };

  return (
    <>
      <div className="res-title">
        <img src="/res.png" alt="R" className="r-image" />
        <p className="title-font res-font">모든 예약은 이곳에서 하세요.</p>
        <hr/>
      </div>
      <div className="main-container">
        <div className="title-row">
          <p className="title-font">예약</p>
        </div>
        <div className="status-container">
          <p>2층 소프트웨어 3D프린터</p>
          <hr/>
          <div className="image-container-new">
            {printerStates.map((state, index) => (
              <div key={index} className="printer-card">
                <p className="printer-name">프린터{['A','B','C','D'][index]}</p>  {/* ✅ 추가 */}
                <img
                  src={getImage(state)}
                  alt={state}
                  className="status-img-new"
                />
                <button
                  onClick={() => handleReserve(index)}
                  disabled={state === 'available'}  /* 사용 가능일 때 버튼 비활성 */
                  className={`status-button-new ${getButtonClass(state)}`}
                >
                  {getButtonText(state)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationPage;