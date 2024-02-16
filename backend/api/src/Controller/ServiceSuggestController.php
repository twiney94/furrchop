<? namespace App\Controller;

use App\Service\SimilarServiceSuggester;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ServiceController extends AbstractController
{
    #[Route('/service/{id}/suggest', name: 'service_suggest')]
    public function suggestSimilarServices(Service $service, SimilarServiceSuggester $suggester): JsonResponse
    {
        $similarServices = $suggester->suggestSimilarServices($service);

        // retourner les services similaires
        $similarServiceIds = array_map(function ($similarService) {
            return $similarService->getId();
        }, $similarServices);

        return $this->json($similarServiceIds);
    }
}
