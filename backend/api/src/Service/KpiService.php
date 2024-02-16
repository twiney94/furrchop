<?php

namespace App\Service;

use App\Entity\Booking;
use App\Entity\Shop;
use Doctrine\ORM\EntityManagerInterface;

class KpiService
{
    private EntityManagerInterface $entityManager;


    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function bookingKpi(): array
    {
        $todayStart = (new \DateTime())->setTime(0, 0, 0);
        $todayEnd = (new \DateTime())->setTime(23, 59, 59);

        $yesterdayStart = (new \DateTime('yesterday'))->setTime(0, 0, 0);
        $yesterdayEnd = (new \DateTime('yesterday'))->setTime(23, 59, 59);

        $lastWeekStart = (new \DateTime())->modify('-7 days')->setTime(0, 0, 0);

        $lastWeekBookings = $this->countBookingsBetween($lastWeekStart, $yesterdayEnd);

        $yesterdaysBookings = $this->countBookingsBetween($yesterdayStart, $yesterdayEnd);

        $todaysBookings = $this->countBookingsBetween($todayStart, $todayEnd);

        $totalBookings = $this->countTotalBookings();

        $lastMonthStart = (new \DateTime())->modify('-30 days')->setTime(0, 0, 0);
        $lastMonthsBookings = $this->countBookingsBetween($lastMonthStart, $todayEnd);

        return [
            'last_week' => $lastWeekBookings,
            'yesterday' => $yesterdaysBookings,
            'today' => $todaysBookings,
            'total' => $totalBookings,
            'last_month' => $lastMonthsBookings
        ];
    }

    private function countBookingsBetween(\DateTime $start, \DateTime $end): int
    {
        $qb = $this->entityManager->createQueryBuilder();
        $qb->select('count(b.id)')
            ->from(Booking::class, 'b')
            ->where('b.createdAt >= :start AND b.createdAt <= :end')
            ->setParameter('start', $start)
            ->setParameter('end', $end);
        return (int)$qb->getQuery()->getSingleScalarResult();
    }

    private function countTotalBookings(): int
    {
        $qb = $this->entityManager->createQueryBuilder();
        $qb->select('count(b.id)')
            ->from(Booking::class, 'b');
        return (int)$qb->getQuery()->getSingleScalarResult();
    }

    public function shopKpi(): array
    {
        $lastWeek = new \DateTime('-7 days midnight');

        // New shops created in the last week
        $newShopsQuery = $this->entityManager->createQueryBuilder()
            ->select('count(s.id)')
            ->from(Shop::class, 's')
            ->where('s.createdAt >= :lastWeek')
            ->setParameter('lastWeek', $lastWeek)
            ->getQuery();
        $newShops = $newShopsQuery->getSingleScalarResult();

        // Total number of shops
        $totalShopsQuery = $this->entityManager->createQueryBuilder()
            ->select('count(s.id)')
            ->from(Shop::class, 's')
            ->getQuery();
        $totalShops = $totalShopsQuery->getSingleScalarResult();

        // Hot and cold shops based on bookings in the last week
        $bookingsLastWeekQuery = $this->entityManager->createQueryBuilder()
            ->select('IDENTITY(b.shop) as shopId, COUNT(b.id) as bookingCount')
            ->from(Booking::class, 'b')
            ->where('b.createdAt >= :lastWeek')
            ->groupBy('b.shop')
            ->setParameter('lastWeek', $lastWeek)
            ->getQuery()
            ->getResult();

        $hotShops = 0;
        $coldShops = 0;

        foreach ($bookingsLastWeekQuery as $result) {
            if ($result['bookingCount'] >= 3) {
                $hotShops++;
            } elseif ($result['bookingCount'] < 3) {
                $coldShops++;
            }
        }

        return [
            'new_shops' => $newShops,
            'total_shops' => $totalShops,
            'hot_shops' => $hotShops,
            'cold_shops' => $coldShops,
        ];
    }
}
