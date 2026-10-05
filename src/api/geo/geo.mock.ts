import type { StationLocation } from './GeoModel'

export const TIME_POINTS: string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export const BISHKEK_CENTER = {
    lat: 42.8746,
    lng: 74.5698,
} as const

export const TEMPERATURE_STATIONS: StationLocation[] = [
    { id: 't1', name: 'Площадь Ала-Тоо', district: 'Первомайский р-н', lat: 42.8746, lng: 74.6037 },
    { id: 't2', name: 'Мкр. Асанбай', district: 'Октябрьский р-н', lat: 42.825, lng: 74.618 },
    { id: 't3', name: 'Кызыл-Аскер', district: 'Ленинский р-н', lat: 42.88, lng: 74.535 },
    { id: 't4', name: 'Мкр. Восток-5', district: 'Свердловский р-н', lat: 42.877, lng: 74.64 },
    { id: 't5', name: 'Рынок Кудайберген', district: 'Первомайский р-н', lat: 42.905, lng: 74.52 },
    { id: 't6', name: 'Ж/м Кара-Жыгач', district: 'Октябрьский р-н', lat: 42.845, lng: 74.655 },
    { id: 't7', name: 'Ботанический сад', district: 'Октябрьский р-н', lat: 42.852, lng: 74.605 },
]

export const WIND_STATIONS: StationLocation[] = [
    { id: 'w1', name: 'Пригородное шоссе', district: 'Северный коридор', lat: 42.935, lng: 74.575 },
    { id: 'w2', name: 'Чон-Арык (ВДНХ)', district: 'Предгорье', lat: 42.795, lng: 74.582 },
    { id: 'w3', name: 'ТЭЦ Бишкек', district: 'Восточная промзона', lat: 42.868, lng: 74.655 },
    { id: 'w4', name: 'Мкр. Аламедин-1', district: 'Свердловский р-н', lat: 42.9, lng: 74.675 },
    { id: 'w5', name: 'Мкр. Джал-29', district: 'Ленинский р-н', lat: 42.835, lng: 74.57 },
    { id: 'w6', name: 'Орто-Сайские высоты', district: 'Южная возвышенность', lat: 42.805, lng: 74.62 },
]

export const INSOLATION_STATIONS: StationLocation[] = [
    { id: 'i1', name: 'Парк Ынтымак', district: 'Южная магистраль', lat: 42.828, lng: 74.588 },
    { id: 'i2', name: 'Парк Победы', district: 'Южные ворота', lat: 42.823, lng: 74.609 },
    { id: 'i3', name: 'Западный автовокзал', district: 'Пр. Жибек-Жолу', lat: 42.885, lng: 74.57 },
    { id: 'i4', name: 'Мкр. Тунгуч', district: 'Октябрьский р-н', lat: 42.855, lng: 74.678 },
    { id: 'i5', name: 'Парк Панфилова', district: 'Центральный парк', lat: 42.879, lng: 74.598 },
    { id: 'i6', name: 'Ж/м Кок-Жар', district: 'Октябрьский р-н', lat: 42.831, lng: 74.642 },
]
