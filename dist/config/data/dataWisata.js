const data = [
    {
        id: 1,
        name: 'Tugu Ikan Belida',
        latitude: -2.992686,
        longitude: 104.759530,
        thumbnail: '/images/tugu-ikan-belida-1.jpg',
        description: 'test',
        location: '',
        open: "everyday",
        gallery: [
            '/images/tugu-ikan-belida-1.jpg',
            '/images/tugu-ikan-belida-2.jpg',
            '/images/tugu-ikan-belida-3.jpg'
        ]
    },
    {
        id: 2,
        name: 'Jembatan Ampera',
        latitude: -2.990377,
        longitude: 104.762298,
        thumbnail: '/images/jembatan-ampera-1.jpg',
        description: 'test',
        location: '',
        open: "everyday",
        gallery: [
            '/images/jembatan-ampera-1.jpg',
            '/images/jembatan-ampera-2.jpg',
            '/images/jembatan-ampera-3.jpg',
            '/images/jembatan-ampera-4.jpg'
        ]
    },
    {
        id: 3,
        name: 'Kompleks Olahraga jakabaring',
        latitude: -3.017441,
        longitude: 104.798137,
        thumbnail: '/images/jakabaring-sport-city-1.jpg',
        description: 'test',
        location: '',
        open: [
            {
                day: 'monday',
                openTime: '07:00:00.000 +0700',
                closeTime: '15:00:00.000 +0700'
            },
            {
                day: 'tuesday',
                openTime: '07:00:00.000 +0700',
                closeTime: '15:00:00.000 +0700'
            },
            {
                day: 'wednesday',
                openTime: '07:00:00.000 +0700',
                closeTime: '15:00:00.000 +0700'
            },
            {
                day: 'thursday',
                openTime: '07:00:00.000 +0700',
                closeTime: '15:00:00.000 +0700'
            },
            {
                day: 'saturday',
                openTime: '07:00:00.000 +0700',
                closeTime: '12:44:00.000 +0700'
            },
        ],
        gallery: [
            '/images/jakabaring-sport-city-1.jpg',
            '/images/jakabaring-sport-city-2.jpg',
            '/images/jakabaring-sport-city-3.jpg',
            '/images/jakabaring-sport-city-4.jpg'
        ]
    },
    {
        id: 4,
        name: 'Benteng Kuto Besak',
        latitude: -2.991408,
        longitude: 104.759163,
        thumbnail: '/images/benteng-kuto-besak-1.jpg',
        description: 'test',
        location: '',
        open: "everyday",
        gallery: [
            '/images/benteng-kuto-besak-1.jpg',
            '/images/benteng-kuto-besak-2.jpg',
            '/images/benteng-kuto-besak-3.jpg'
        ]
    }
]

module.exports = data;