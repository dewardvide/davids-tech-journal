import { EmptyState } from '@/components/ds/feedback/EmptyState.jsx';
import { Button } from '@/components/ds/core/Button.jsx';

export default function NotFound() {
  return (
    <div style={{ marginTop: '3.2em' }}>
      <EmptyState
        code="404"
        title="No entry at this address"
        action={
          <Button as="a" href="/journal" variant="outline">
            Back to the journal
          </Button>
        }
      >
        The page you asked for isn&rsquo;t here. It may have been renamed, or it may never have existed.
      </EmptyState>
    </div>
  );
}
