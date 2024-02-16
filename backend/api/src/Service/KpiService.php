<?php

namespace App\Service;

use App\Entity\Booking;
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
}
