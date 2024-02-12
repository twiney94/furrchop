<?php

namespace App\tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\ResponseInterface;

class DefaultApiTestCase extends ApiTestCase
{
    public const ENDPOINT_SERVICES = '/services';
    public const ENDPOINT_SHOPS = '/shops';
    public const ENDPOINT_BOOKINGS = '/bookings';
    public const ENDPOINT_USERS = '/users';
    public const ENDPOINT_REGISTER = '/register';
    public const ENDPOINT_ACTIVATE = '/activate';
    public const ENDPOINT_AUTH = '/auth';


    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
    }

    protected function request(string $endpoint, array $options = [], string $token = null): ResponseInterface
    {
        $client = self::createClient();

        if ($token) {
            $options['auth_bearer'] = $token;
        }

        return $client->request(Request::METHOD_GET, $endpoint, $options);
    }

    protected function postRequest(string $endpoint, array $options = [], string $token = null): ResponseInterface
    {
        $client = self::createClient();

        if ($token) {
            $options['auth_bearer'] = $token;
        }
        $options['headers'] = ['Content-Type' => 'application/ld+json'];

        return $client->request(Request::METHOD_POST, $endpoint, $options);
    }

    protected function putRequest(string $endpoint, array $options = [], string $token = null): ResponseInterface
    {
        $client = self::createClient();
        if ($token) {
            $options['auth_bearer'] = $token;
        }
        $options['headers'] = ['Content-Type' => 'application/ld+json'];

        return $client->request(Request::METHOD_PUT, $endpoint, $options);
    }

    protected function patchRequest(string $endpoint, array $options = [], string $token = null): array
    {
        $client = self::createClient();
        if ($token) {
            $options['auth_bearer'] = $token;
        }
        $options['headers'] = ['Content-Type' => 'application/merge-patch+json'];

        return $client->request(Request::METHOD_PATCH, $endpoint, $options)->toArray();
    }

    protected function deleteRequest(string $endpoint, array $options = [], string $token = null): ResponseInterface
    {
        $client = self::createClient();
        if ($token) {
            $options['auth_bearer'] = $token;
        }
        $options['headers'] = ['Content-Type' => 'application/ld+json'];

        return $client->request(Request::METHOD_DELETE, $endpoint, $options);
    }
}
