<?php

namespace App\Enum\Booking;

enum StatusEnum
{
public const DRAFT = 'draft';
public const VALIDATED = 'validated';
public const PENDING = 'pending';
public const CANCELED = 'canceled';
}
