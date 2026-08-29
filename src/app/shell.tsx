import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useRouteError } from "react-router-dom";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Loading } from "../components/ui";
import { updateService } from "../services/update-service";

export function AppLayout() {
  const location = useLocation(); const heading = useRef<HTMLHeadingElement>(null); const [registration, setRegistration] = useState<ServiceWorkerRegistration>(); const [remoteUpdate, setRemoteUpdate] = useState<"available" | "started">();
  const { needRefresh: [needRefresh], offlineReady: [offlineReady], updateServiceWorker } = useRegisterSW({ onRegisteredSW: (_url, value) => setRegistration(value) });
  useEffect(() => { heading.current?.focus(); }, [location.pathname]);
  useEffect(() => updateService.subscribe((message) => setRemoteUpdate(message.type === "update-started" ? "started" : "available")), []);
  useEffect(() => { if (needRefresh) updateService.announce("update-available"); }, [needRefresh]);
  useEffect(() => { const check = () => void updateService.check(registration); window.addEventListener("online", check); window.addEventListener("focus", check); void updateService.check(registration, true); return () => { window.removeEventListener("online", check); window.removeEventListener("focus", check); }; }, [registration]);
  return <>
    <header className="app-header"><Link className="brand" to="/exams">Exam Trainer</Link><nav aria-label="共通"><Link to="/exams">試験選択</Link><Link to="/settings/data">データ管理</Link></nav></header>
    {offlineReady && <div className="update-banner" role="status">オフラインで利用する準備ができました。</div>}
    {(needRefresh || remoteUpdate === "available") && <div className="update-banner" role="status"><span>新しい版を利用できます。</span>{needRefresh && <button type="button" onClick={() => void updateService.activate(() => updateServiceWorker(true))}>更新する</button>}</div>}
    {remoteUpdate === "started" && <div className="update-banner" role="status">別のタブで更新中です。保存操作を続けられます。</div>}
    <main className="app-main"><h1 className="sr-only" tabIndex={-1} ref={heading}>Exam Trainer</h1><Suspense fallback={<Loading />}><Outlet /></Suspense></main>
    <footer>学習データはこの端末のブラウザ内に保存されます。</footer>
  </>;
}

export function RouteError() {
  const error = useRouteError();
  if (import.meta.env.DEV && error !== undefined) console.error(error);
  return <main className="centered"><section className="panel"><p className="eyebrow">404 / ERROR</p><h1>ページを表示できません</h1><p>指定された試験または画面が見つかりません。</p><Link className="button primary" to="/exams">試験選択へ戻る</Link></section></main>;
}
